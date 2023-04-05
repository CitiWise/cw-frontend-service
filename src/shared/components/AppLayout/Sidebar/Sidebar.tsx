import Icon, { CaretRightOutlined } from "@ant-design/icons";
import { Badge, Menu } from "antd";
import styles from "./index.module.scss";
import { ICON_MAPPER } from "./utils";

const { SubMenu } = Menu;

// Render sub menu if section name and component list is provided else render normal menu
export const Sidebar = (props: any) => {
  const {
    sideBarMenu = [],
    bottomButtons = null,
    selectedMenu,
    isTrackingLayout,
    setIsTrackingLayout,
    onMenuItemSelect,
    topComponent = null,
  } = props;
  const collapseSideDrawer = () => {
    setIsTrackingLayout((e: any) => (e === 1 ? 4 : 1));
  };

  return (
    <>
      <div className={styles.mainSlideBarContainer}>
        {/* <Input.Search placeholder="Search Dashboard" className={styles.searchInput} /> */}
        {topComponent && <div>{topComponent}</div>}
        <Menu
          mode="inline"
          className={styles.menu}
          selectedKeys={[String(selectedMenu)]}
        >
          {isTrackingLayout && (
            <div onClick={collapseSideDrawer} className={styles.rotatableIcon}>
              <CaretRightOutlined
                className={isTrackingLayout === 4 ? styles.rotateIt : undefined}
              />
            </div>
          )}
          {sideBarMenu.map(
            ({ key, icon, label, sectionName, componentList }: any) => {
              if (sectionName && componentList) {
                return (
                  <SubMenu
                    key={sectionName}
                    title={
                      <span>
                        <Icon type="home" />
                        {sectionName}
                      </span>
                    }
                  >
                    {componentList.map(
                      ({
                        key: childKey,
                        icon: childIcon,
                        label: childLabel,
                      }: any) => (
                        <Menu.Item
                          key={childKey}
                          icon={
                            <Icon
                              component={() =>
                                ICON_MAPPER[
                                  childIcon as keyof typeof ICON_MAPPER
                                ]
                              }
                            />
                          }
                          className={styles.menuItem}
                          onClick={() => {
                            onMenuItemSelect(childKey);
                          }}
                        >
                          {childLabel}
                        </Menu.Item>
                      )
                    )}
                  </SubMenu>
                );
              }
              return (
                <Menu.Item
                  key={key}
                  icon={
                    <Icon
                      component={() =>
                        ICON_MAPPER[icon as keyof typeof ICON_MAPPER]
                      }
                    />
                  }
                  className={styles.menuItem}
                  style={{ position: "relative" }}
                  onClick={() => {
                    onMenuItemSelect(key);
                  }}
                >
                  <p>{label}</p>
                </Menu.Item>
              );
            }
          )}
        </Menu>
        <div className={styles.bottomButtons}>{bottomButtons}</div>
      </div>
    </>
  );
};
