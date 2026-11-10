import { duesPaymentsVisible } from "@/lib/site-data";
import JoinContactPage from "./JoinContactPage";

// Re-check hourly so the dues buttons turn off on DUES_PAYMENTS.hideOn without a redeploy.
export const revalidate = 3600;

export default function Page() {
  return <JoinContactPage showDuesPayments={duesPaymentsVisible()} />;
}
