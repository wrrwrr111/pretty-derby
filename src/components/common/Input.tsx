const Input = ({ className,register,name,placeholder})=>{
  return <div className="w-full relative h-11">
  <input
    className={`w-full h-full text-gray-800 leading-normal shadow-none outline-none focus:outline-none focus:ring-0 focus:text-gray-800 px-3 pt-2.5 pb-1.5 mt-input-outline-light-blue-500 mt-input-outline bg-transparent border border border-gray-300 rounded-lg focus:border-2 focus:border-light-blue-500 undefined undefined`}
    placeholder=" "
    {...register("q")}
  />
  <label
    className={`text-gray-400 absolute left-0 -top-1.5 w-full h-full false border-gray-300 pointer-events-none flex false leading-10 transition-all duration-300`}
  >
    {placeholder || '请输入'}
  </label>
</div>
}

export default Input