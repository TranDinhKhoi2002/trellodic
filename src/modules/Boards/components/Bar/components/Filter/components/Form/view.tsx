import { UseFormReturn } from 'react-hook-form';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormProvider from '@/components/Form/components/FormProvider';
import RHFSelect from '@/components/Form/components/Select';
import { BoardGlobalProps, withBoard } from '@/hocs';
import { FilterDefaultValues } from './validation';

type FormViewProps = BoardGlobalProps & {
  isOpen: boolean;
  methods: UseFormReturn<FilterDefaultValues, any, undefined>;
  onClose: () => void;
  onSubmit: (_values: FilterDefaultValues) => void;
};

const FORM_ID = 'filter-board';

function FormView({ board: { labels = [] }, isOpen, methods, onClose, onSubmit }: FormViewProps) {
  const { handleSubmit } = methods;

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: { xs: '100vw', sm: '20rem' },
          height: '100%',
          maxHeight: '100%',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '16px !important' }}>Filter</Typography>
          <Divider sx={{ mx: '-24px', mt: 2 }} />
        </Box>
        <Box sx={{ overflowY: 'auto', flex: 1 }}>
          <FormProvider id={FORM_ID} methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFSelect id="labels" name="labels" label="Label" multiple options={labels} getLabelBy="title">
              {labels.map((label) => (
                <MenuItem key={label._id} value={label._id}>
                  {label.title}
                </MenuItem>
              ))}
            </RHFSelect>
          </FormProvider>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end' }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button form={FORM_ID} variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default withBoard(FormView);