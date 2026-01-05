import React, { useState } from "react";

const CareerPage = () => {
  const [careerData, setCareerData] = useState({
    name: "",
    email: "",
    position: "",
  });

  const handleChange = (e) => {
    setCareerData({ ...careerData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("Career Application:", careerData);
    alert("Application submitted successfully!");

    setCareerData({ name: "", email: "", position: "" });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">💼 Careers</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={careerData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={careerData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="text"
          name="position"
          placeholder="Applying Position"
          value={careerData.position}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Apply Now
        </button>
      </form>
    </div>
  );
};

export default CareerPage;
