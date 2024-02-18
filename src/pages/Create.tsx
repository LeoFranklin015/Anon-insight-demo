import React, { useState } from "react";

const Create = () => {
  const [regexPattern, setRegexPattern] = useState("");
  const [sindriAPIKey, setSindriAPIKey] = useState("");
  const [CircuitId, SetCircuitId] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Validate the regex pattern
    try {
      new RegExp(regexPattern);
    } catch (error) {
      alert("Invalid regex pattern! Please enter a valid pattern.");
      return;
    }

    try {
      // Send the data to the server endpoint
      const response = await fetch(
        "https://anoninsight.onrender.com/circuit_id",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ regex: regexPattern, apiKey: sindriAPIKey }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.circuit_id); // Output the circuit_id to console
      console.log(data.form_id); // Output the circuit_id to console

      if (data.circuit_id) {
        SetCircuitId(data.circuit_id);
      }
      // You can handle further actions here if needed
      alert("Submission successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Submit Regex Pattern and Sindri API Key
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="regexPattern"
              className="block text-sm font-medium text-gray-700"
            >
              Regex Pattern
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="regexPattern"
                name="regexPattern"
                value={regexPattern}
                onChange={(e) => setRegexPattern(e.target.value)}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter regex pattern"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="sindhiAPIKey"
              className="block text-sm font-medium text-gray-700"
            >
              Sindhi API Key
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="sindhiAPIKey"
                name="sindhiAPIKey"
                value={sindriAPIKey}
                onChange={(e) => setSindriAPIKey(e.target.value)}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter Sindri API key"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
        {CircuitId ? <>{CircuitId}</> : <></>}
      </div>
    </div>
  );
};

export default Create;
