const CheckBox = ({ register, name, value, label, icon }) => {
  return (
    <div key={value} className="flex items-center mr-1 mb-1">
      <input
        id={value}
        type="checkbox"
        className={`mt-checkbox mt-checkbox-light-blue-500 hidden overflow-hidden`}
        value={value}
        {...register(name)}
      />
      <label
        htmlFor={value}
        className="flex items-center cursor-pointer text-gray-400 select-none transition-all duration-300"
      >
        <span className="relative w-5 h-5 inline-block mr-2 rounded-sm border border-gray-500 transition-all duration-300"></span>
        {icon && <img alt="" src={icon} width={20} />}
        {label}
      </label>
    </div>
  );
};
export default CheckBox;
