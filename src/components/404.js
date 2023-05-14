import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routesPath';

const Page404 = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        if (window.location.pathname.startsWith('http://localhost:3000/')) {
            navigate(routes.login.path).then(() => {
                navigate(-1);
            });
        } else {
            navigate(-1);
        }
    };

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={handleBackHome}>Back Home</Button>}
        />
    );
};

export default Page404;
