const { Button } = require("antd");
const { useState, useCallback } = require("react");

function Row4ActionButton({ item }: any) {
  const { isActive, key, label, onClick } = item;
  const [isLoading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setLoading(true);
    try {
      await onClick(key);
    } finally {
      setLoading(false);
    }
  }, [key, onClick]);

  return (
    <Button
      disabled={isLoading}
      type={isActive ? "primary" : null}
      size="large"
      key={key}
      onClick={handleClick}
    >
      <div>{label}</div>
    </Button>
  );
}

export default Row4ActionButton;
