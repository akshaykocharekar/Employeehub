import { useEffect, useState } from "react";

const useMockFetch = (data, delay = 500) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(data);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [data, delay]);

  return { loading, data: result };
};

export default useMockFetch;