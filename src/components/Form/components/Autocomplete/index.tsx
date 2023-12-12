import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, SxProps, TextField, Theme, InputLabel } from '@mui/material';

type RHFAutocompleteProps<T> = {
  id: string;
  name: string;
  onChangeValue?: Function;
  label: string;
  options: T[];
  size?: 'small' | 'medium';
  isRequired?: boolean;
  getOptionLabel?: ((_option: T) => string) | undefined;
  isOptionEqualToValue?: ((_option: T, _value: T) => boolean) | undefined;
  sx?: SxProps<Theme> | undefined;
};

export default function RHFAutocomplete<T extends {}>({
  id,
  name,
  isRequired,
  label,
  onChangeValue,
  ...other
}: RHFAutocompleteProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            {...field}
            value={field.value || ''}
            fullWidth
            onChange={(_, value) => {
              field.onChange(value);
              if (onChangeValue) onChangeValue();
            }}
            placeholder={label}
            renderInput={(params) => (
              <>
                <InputLabel htmlFor={id} required={isRequired} color="error" sx={{ mb: 1 }}>
                  {label}
                </InputLabel>
                <TextField {...params} id={id} value={field.value} error={!!error} helperText={error?.message} />
              </>
            )}
            {...other}
          />
        );
      }}
    />
  );
}
