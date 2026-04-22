interface Props {
  isTouched: boolean;
  error?: string;
}

export function FormFieldError({ isTouched, error }: Props) {
  if (!isTouched || !error) {
    return null;
  }

  return <p className="text-xs text-destructive">{error}</p>;
}
