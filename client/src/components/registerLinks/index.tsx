import { Flex } from "antd";
import { Link } from "react-router-dom";

export default function RegisterLinks() {
  return (
    <Flex vertical gap={18}>
      <p>
        People who use our service may have uploaded your contact information to
        Instagram. <Link to="#">Learn more</Link>
      </p>

      <p>
        By signing up, you agree to our
        <Link to="#"> Terms,</Link>
        <Link to="#"> Privacy Policy </Link>
        and
        <Link to="#"> Cookies Policy.</Link>
      </p>
    </Flex>
  );
}
