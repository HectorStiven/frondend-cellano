import { Box, Typography } from '@mui/material';
interface Props {
  title: string;
  width?: string;
  fontSize?: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Title: React.FC<Props> = ({ title, width, fontSize }: Props) => {
  return (
    <Box
      className={`border px-4 text-white fs-5 p-1`}
      sx={{
        display: 'grid',
        background:
          'linear-gradient(90deg, #0E2050 41%, rgba(50, 50, 194, 0.63) 73%, rgba(0, 213, 255, 0.39) 100%) 0% 0% no-repeat padding-box',
        width: width || '100%',
        margin: '0 auto',
        height: '40px',
        color: '#fff',
        borderRadius: '10px',
        pl: '10px',
        pr: '10px',
        fontSize: fontSize || '17px',
        fontWeight: '900',
        alignContent: 'center',
        marginTop: '10px',
      }}
    >
      <Typography
        sx={{
          fontSize: fontSize || '17px',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
