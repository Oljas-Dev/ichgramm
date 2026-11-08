import loginImg from "./../../assets/login_img.png";

export default function LoginImg({ size }: { size: string }) {
  return <img src={loginImg} width={size} alt="login picture" />;
}
