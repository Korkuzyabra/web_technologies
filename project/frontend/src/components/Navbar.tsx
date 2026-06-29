import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: '8px 12px',
  minHeight: 56,
}));

const items = [
  { id: '1', label: 'Главная', path: '/' },
  { id: '2', label: 'Каталог', path: '/list' },
  { id: '3', label: 'Диаграммы', path: '/chart' },
  { id: '4', label: 'Тестирование', path: '/testing' },
  { id: '5', label: 'CRUD', path: '/crud' },
];

function Navbar({ active }: { active: string }) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/list?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 0, bgcolor: 'transparent', mt: '28px' }}>
      <Container maxWidth="lg">
        <StyledToolbar disableGutters>
          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', flex: 1 }}>
            {items.map((item) => (
              <Link key={item.id} to={item.path}>
                <Button
                  variant={active === item.id ? 'contained' : 'text'}
                  color="primary"
                  size="medium"
                  sx={{ minWidth: 100 }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{ position: 'absolute', right: 8, display: 'flex', gap: 0.5, alignItems: 'center' }}
          >
            <TextField
              size="small"
              placeholder="Найти"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: 140, bgcolor: 'background.paper' }}
            />
            <Button type="submit" variant="contained" size="small">
              Поиск
            </Button>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
