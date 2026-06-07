import { Box, Container, Typography } from '@mui/material';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: 4,
                py: 3,
                bgcolor: 'grey.100',
                borderTop: 1,
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="xl">
                <Typography variant="body2" align="center">
                    Самые высокие здания и сооружения
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                >
                    © 2026 Все права защищены
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;