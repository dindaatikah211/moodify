import AccountButton from "@/features/auth/components/AccountButton";
import Brand from "@/shared/components/commons/Brand";
import { STICKY_BAR_CLASS } from "@/shared/constants/Ui";

export default function ChatHeader() {
  return (
    <header className={STICKY_BAR_CLASS}>
      <Brand href="/" />
      <AccountButton />
    </header>
  );
}