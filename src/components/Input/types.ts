export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur' | 'value' | 'name' | 'ref'> {
  control: any;
  name: string;
  widthFull?: boolean;
  containerClass?: string;
  label?: string;
  labelClass?: string;
  error?: boolean;
  errorClass?: string;
  errorMessage?: string;
  errorMessageClass?: string;
  inputContainerClass?: string;
}
