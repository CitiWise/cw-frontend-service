import { Button, notification } from "antd";
import { useState, useContext } from "react";
import {
  updateProfileDetails,
  changePassword,
} from "../../../../shared/api/profile";
import { ResetForm } from "../../../../shared/components/ResetForm";
import { AuthContext } from "../../../../shared/contexts/Auth";
import errorHandler from "../../../../shared/utils/errorHandler";
import { ProfileForm } from "../../../../shared/components/ProfileForm";
import styles from "./index.module.scss";

export function Profile() {
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [isResetForm, setIsResetForm] = useState(false);

  const {
    authState: { profile },
  } = useContext(AuthContext);

  const handleEditButtonClick = () => {
    setIsFormDisabled(false);
    setIsResetForm(false);
  };

  const handleResetButtonClick = () => {
    setIsResetForm(true);
    setIsFormDisabled(true);
  };

  const handleResetCloseButtonClick = () => {
    setIsResetForm(false);
    setIsFormDisabled(true);
  };

  const onFinish = async (updateProfileValues: any) => {
    try {
      await updateProfileDetails(updateProfileValues);

      notification.success({
        message: "Success",
        description: "Profile updated successfully.",
        placement: "topRight",
      });

      setIsFormDisabled(true);
    } catch (error) {
      errorHandler(error);
    }
  };

  const resetPassword = async (formValues: any) => {
    try {
      await changePassword(formValues);

      notification.success({
        message: "Success",
        description: "Password changed successfully.",
        placement: "topRight",
      });
    } catch (error) {
      errorHandler(error);
    } finally {
      handleResetCloseButtonClick();
    }
  };

  //   useEffect(() => {
  //     getProfileData()
  // }, []);

  return (
    <div className={styles.profilePage}>
      <div className={styles.header}>
        <h4 className={styles.title} id={styles.titleId}>
          {isResetForm ? "Change Password" : "Profile Details"}
        </h4>
        {!isResetForm && (
          <div className={styles.buttonsForResponsivness}>
            {isFormDisabled && (
              <Button type="primary" onClick={handleEditButtonClick}>
                Edit
              </Button>
            )}
            <Button type="primary" onClick={handleResetButtonClick}>
              Change Password
            </Button>
          </div>
        )}
      </div>

      {isResetForm ? (
        <ResetForm
          onFinish={(formValues: any) => resetPassword(formValues)}
          onCancel={() => handleResetCloseButtonClick()}
        />
      ) : (
        <ProfileForm
          onFinish={onFinish}
          isFormDisabled={isFormDisabled}
          initialValues={profile}
        />
      )}
      <div style={{ marginBottom: "40px" }}></div>
    </div>
  );
}
