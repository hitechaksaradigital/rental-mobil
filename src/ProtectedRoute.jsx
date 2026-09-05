import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container">
        <div className="inline-flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          Memverifikasi sesi…
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}