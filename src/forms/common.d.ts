export type CommonFormProps<T = any> = {
  onSub?: (data: T) => void;
  defaultValues?: Partial<T>;
  disabled?: boolean;
};
