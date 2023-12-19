import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { User } from '@/types/user.type';
import { useView } from '@/hooks';

type RecommendationsViewProps = {
  recommendVisible: boolean;
  recommendations: Pick<User, '_id' | 'name'>[] | undefined;
  data: {};
  isLoading: boolean;
  onRecommendationVisible: () => void;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
};

function RecommendationsView({
  recommendVisible,
  recommendations = [],
  isLoading,
  data,
  onRecommendationVisible,
  onChange,
}: RecommendationsViewProps) {
  const view = useView({ data: recommendations, isLoading });

  const renderRecommendations = () => {
    if (!recommendVisible) return;

    if (view) return view;

    if (recommendations.length === 0) {
      return <Typography sx={{ textAlign: 'center', my: 3 }}>No recommendations found</Typography>;
    }

    return (
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend" sx={{ my: 2 }}>
          From the current skills of the card, these members might be good candidates to join
        </FormLabel>
        <FormGroup>
          {recommendations.map((recommendation) => (
            <FormControlLabel
              key={recommendation._id}
              control={
                <Checkbox
                  checked={data[recommendation._id as keyof typeof data] || false}
                  onChange={onChange}
                  name={recommendation._id}
                />
              }
              label={recommendation.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  };

  return (
    <Box sx={{ my: 1 }}>
      <Button sx={{ mb: 2 }} onClick={onRecommendationVisible}>
        {recommendVisible ? 'Hide recommend' : 'Recommend'}
      </Button>
      {renderRecommendations()}
    </Box>
  );
}

export default RecommendationsView;
