import { IconType } from 'react-icons';

interface ProfileSectionProps {
    icons: IconType[];
    headings: string[];
    data: (string | JSX.Element | number)[];
}

function ProfileSection({ icons, headings, data }: ProfileSectionProps) {
    return (
        <div className="container flex items-center gap-5 px-16 text-[14px] md:text-[16px] h-full">
            <div className="icons flex flex-col justify-around h-full text-[21px] md:text-[23px] py-5">
                {icons.map((Icon, index) => (
                    <Icon key={index} />
                ))}
            </div>

            <div className="heading flex flex-col justify-around h-full md:min-w-36 py-5">
                {headings.map((heading, index) => (
                    <p key={index}>{heading}</p>
                ))}
            </div>

            <div className="data font-semibold flex flex-col justify-around h-full min-w-32 py-5">
                {data.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </div>
    );
}

export default ProfileSection;
