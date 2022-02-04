import { useState } from "react";

const useHttp = (post = false) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl =
    "https://test-project-eb0c5-default-rtdb.firebaseio.com/tasks.json";

  const requestHandler = async (taskText) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (post) {
        response = await fetch(baseUrl, {
          method: "POST",
          body: JSON.stringify({ text: taskText }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        response = await fetch(baseUrl);
      }

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      if (post) {
        const generatedId = data.name; // firebase-specific => "name" contains generated id
        const createdTask = { id: generatedId, text: taskText };
        setIsLoading(false);

        return createdTask;
      } else {
        const loadedTasks = [];

        for (const taskKey in data) {
          loadedTasks.push({ id: taskKey, text: data[taskKey].text });
        }

        setIsLoading(false);
        return loadedTasks;
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  return { isLoading, error, requestHandler };
};

export default useHttp;
