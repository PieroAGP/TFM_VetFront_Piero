import { useState } from 'react';

const UserDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('http://localhost:4000/users/logout', {
      method: 'POST',
      credentials: 'include',
    });
    window.location.reload();
  };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)}>
        {user.nombre} ⏷
      </button>
      {open && (
        <div style={styles.dropdown}>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    background: '#fff',
    border: '1px solid #ccc',
    padding: '10px',
    zIndex: 10,
  },
};

export default UserDropdown;
