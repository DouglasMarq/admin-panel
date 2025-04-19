import LoginCard from '@/app/components/cards/loginCard';
import Link from 'next/link';

export default function Login() {
  return (
    <div>
      <Link href="/register" prefetch={true} style={{ display: 'none' }} />
      <Link href="/dashboard" prefetch={true} style={{ display: 'none' }} />
      <LoginCard />
    </div>
  );
}
