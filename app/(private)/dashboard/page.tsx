import { logout } from '@/app/actions/auth';
import Button from '@/app/components/button';

export default function Dashboard() {
  return (
    <div>
      <Button action={logout} type="primary">
        Logout
      </Button>
    </div>
  );
}
