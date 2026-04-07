import { useContext } from 'react';
import { EmployeeContext } from '../contexts/EmployeeContext';

const useEmployees = () => {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error('useEmployees must be used inside EmployeeProvider');
  return ctx;
};

export default useEmployees;