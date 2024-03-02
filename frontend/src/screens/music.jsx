import { useParams } from 'react-router-dom';

const Music = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Music Player Page with id { id }</h1>
        </div>
    );
}
export default Music;