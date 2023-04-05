import { Button, Col, Row, Space } from "antd";
import styles from "./index.module.scss";
import Row4ActionButton from "./Row4ActionButton";

export function TopFilterComponent(props: any) {
  const {
    row1,
    row2,
    row3,
    row4,
    row5,
    row1children = [],
    shouldShowRow5 = false,
    memoizedProgress,
    isQTaskInProgress,
    isBulkSync,
    handleBulkSync,
  } = props;

  return (
    <div className={`${styles.main}`}>
      {row2 && (
        <Row justify="space-between" className={styles.row1}>
          <Col className={styles.date}>
            {row1 && (
              <div className={styles.center}>
                {row1children.map((children: any) => children)}
              </div>
            )}
          </Col>
          <Col className={styles.download}>{row2.map((item: any) => item)}</Col>
        </Row>
      )}

      {row4 && (
        <Row justify="space-between" className={`${styles.row3}`}>
          <Col span={12}>
            <Space size={22}>
              {row4.map((item: any, index: any) => {
                if (!item) {
                  return null;
                }
                if (item.isNotButton) {
                  return item.render(memoizedProgress);
                } else {
                  return <Row4ActionButton key={index} item={item} />;
                }
              })}
            </Space>
          </Col>
        </Row>
      )}
      <div className={styles.BSProgress}>
        {isBulkSync?.length > 0 && (
          <Button
            size="small"
            type="primary"
            className={styles.bulkSyncOrders}
            onClick={handleBulkSync}
          >
            Bulk Sync
          </Button>
        )}
      </div>
      {row5 && shouldShowRow5 && <Row className={styles.row4}>{row5}</Row>}
    </div>
  );
}
