import { RegisterOptions, UseFormRegister } from 'react-hook-form';

type Props = {
  type: React.HTMLInputTypeAttribute;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  autoComplete: string;
};

export default function Input({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  autoComplete,
  rules
}: Props) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        {...register(name, rules)}
        autoComplete={autoComplete}
      />
      <p className='mt-1 min-h-[1.7rem] text-xs text-red-700'>{errorMessage}</p>
    </div>
  );
}
