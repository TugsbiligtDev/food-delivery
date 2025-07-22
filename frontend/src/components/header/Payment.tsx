interface PaymentProps {
  label?: string;
  amount?: number;
  isTotal?: boolean;
  currency?: string;
  className?: string;
}

const Payment = ({
  label = "Total",
  amount = 0,
  isTotal = false,
  currency = "$",
  className = "",
}: PaymentProps) => {
  return (
    <div
      className={`w-full flex justify-between items-center gap-2 py-1 ${className}`}
    >
      <p
        className={`${
          isTotal ? "font-semibold text-midnight-black" : "text-slate-gray"
        } text-sm`}
      >
        {label}
      </p>
      <p
        className={`${
          isTotal
            ? "font-bold text-lg text-midnight-black"
            : "font-semibold text-base text-midnight-black"
        }`}
      >
        {currency}
        {amount.toFixed(2)}
      </p>
    </div>
  );
};

export default Payment;
