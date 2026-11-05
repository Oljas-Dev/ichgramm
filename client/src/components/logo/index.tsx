import logo from "./../../assets/logo.svg";

export default function Logo({ size }: { size: string }) {
  return <img src={logo} width={size} alt="logo picture" />;
}
