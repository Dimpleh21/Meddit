const FormBar = ({ formData, handleChange }) => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {[
        { label: "Wallet Address", name: "walletAddress", type: "text" },
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Date of Birth", name: "dob", type: "date" },
        { label: "Phone Number", name: "phone", type: "text" },
        { label: "Hospital Name", name: "hospitalName", type: "text" },
        { label: "Hospital Location", name: "hospitalLocation", type: "text" },
        { label: "Department", name: "department", type: "text" },
        { label: "Specialization", name: "specialization", type: "text" },
        { label: "Designation", name: "designation", type: "text" },
        { label: "Experience (Years)", name: "experience", type: "number" },
        { label: "Password", name: "password", type: "password" },
        {
          label: "Confirm Password",
          name: "confirmPassword",
          type: "password",
        },
      ].map((field) => (
        <div key={field.name}>
          <label className="block text-xs font-medium">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            className="w-full bg-gray-100 p-1 text-xs rounded-md"
          />
        </div>
      ))}

      <div>
        <label className="block text-xs font-medium">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full bg-gray-200 p-1 text-xs rounded-md"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
    </div>
  );
};

export default FormBar;
