import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {
    const people = [
        {
            name: 'Priya Kumari',
            role: 'CA / Delhi University',
            imageUrl:
                'https://media.licdn.com/dms/image/v2/D5603AQF6Mh38RsYjag/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718314588347?e=1741219200&v=beta&t=tdtU_7uqPuzFzKSDOZnpySjpgB5eVwNmE0RFRfjzfXA',
        },
        {
            name: 'gaurav singh',
            role: ' VFX designer / Netflix',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Kaushik shahare',
            role: 'senior developer / Microsoft',
            imageUrl:
                'https://media.licdn.com/dms/image/v2/D4D03AQFSPoxtjhToAQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1720525853890?e=1741219200&v=beta&t=--Wdbq4N1zgUJ_wf4ElXeHiYphy32drRzXRMpUkKcZo',
        },
        {
            name: 'Golu Kumar',
            role: 'Senior developer / google',
            imageUrl:
                'https://media.licdn.com/dms/image/v2/D4D35AQFv55OeAM_PaQ/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1719449977066?e=1736258400&v=beta&t=uE87m_qTjesAsgIAsXdIrCBO5FJztq-Nijyi-q7-iHY',
        },
        // More people...
    ]

    return (
        <HomeLayout>
            {/* our students page  */}
            <div className="bg-gray-850 py-24 sm:py-32">
                <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
                    <div className="max-w-xl">
                        <h2 className="text-pretty text-3xl font-semibold tracking-tight text-orange-600 sm:text-4xl">
                            Meet our leadership
                        </h2>
                        <p className="mt-6 text-lg/8 text-white">
                            We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
                            best results for our clients.
                        </p>
                    </div>
                    <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                        {people.map((person) => (
                            <li key={person.name}>
                                <div className="flex items-center gap-x-6">
                                    <img alt="" src={person.imageUrl} className="size-16 rounded-full" />
                                    <div>
                                        <h3 className="text-base/7 font-semibold tracking-tight text-white">{person.name}</h3>
                                        <p className="text-sm/6 font-semibold text-indigo-500">{person.role}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="pl-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <div className="w-1/2">
                        <img
                            id="test1"
                            style={{
                                filter: "drop-shadow(0px 10px 10px rgb(0,0,0));"
                            }}
                            alt="about main image"
                            className="drop-shadow-2xl"
                            src={aboutMainImage}
                        />
                    </div>
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide the afoordable and quality education to the world.
                            We are providing the platform for the aspiring teachers and students to share
                            their skills, creativity and knowledge to each other to empower and contribute
                            in the growth and wellness of mankind.
                        </p>
                    </section>
                </div>
                <div className="carousel w-1/2 m-auto my-16">
                    {celebrities && celebrities.map(celebrity => (<CarouselSlide
                        {...celebrity}
                        key={celebrity.slideNumber}
                        totalSlides={celebrities.length}

                    />))}
                </div>
            </div>

        </HomeLayout>
    );
}


export default AboutUs;



