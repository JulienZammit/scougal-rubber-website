import SalesMap from "@/components/SalesMap";

const salesTerritories = [
  {
    position: [39.158, -75.5244],
    name: "Delaware",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [27.9944024, -81.7602544],
    name: "Florida",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [32.1656221, -82.9000751],
    name: "Georgia",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [39.0457549, -76.6412712],
    name: "Maryland",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [40.0583238, -74.4056612],
    name: "New Jersey",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [40.7127753, -74.0059728],
    name: "New York",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [35.7595731, -79.0192997],
    name: "North Carolina",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [33.836081, -81.1637245],
    name: "South Carolina",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [37.4315734, -78.6568942],
    name: "Virginia",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [38.9071923, -77.0368707],
    name: "Washington DC",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [38.5976262, -80.4549026],
    name: "West Virginia",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [56.130366, -106.346771],
    name: "Canada",
    rep: "Hans Swartzentruber",
    email: "hans.swartzentruber@scougalrubber.com",
    phone: "775-360-7572",
  },
  {
    position: [32.3182314, -86.902298],
    name: "Alabama",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [61.3707161, -152.404419],
    name: "Alaska",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [34.0489281, -111.0937311],
    name: "Arizona",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [35.20105, -91.8318334],
    name: "Arkansas",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [39.5500507, -105.7820674],
    name: "Colorado",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [19.8967662, -155.5827818],
    name: "Hawaii",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [44.0682019, -114.7420408],
    name: "Idaho",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [39.011902, -98.4842465],
    name: "Kansas",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [37.8393332, -84.2700179],
    name: "Kentucky",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [30.9842977, -91.9623327],
    name: "Louisiana",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [32.3546679, -89.3985283],
    name: "Mississippi",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [37.9642529, -91.8318334],
    name: "Missouri",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [46.8796822, -110.3625658],
    name: "Montana",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [34.5199402, -105.8700901],
    name: "New Mexico",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [35.0077519, -97.092877],
    name: "Oklahoma",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [37.7749, -122.4194],
    name: "San Francisco",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [35.0077519, -97.092877],
    name: "Oregon",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [36.1626638, -86.7816016],
    name: "Tennessee",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [31.9685988, -99.9018131],
    name: "Texas",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [39.3209801, -111.0937311],
    name: "Utah",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [47.7510741, -120.7401386],
    name: "Washington",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [43.0759678, -107.2902839],
    name: "Wyoming",
    rep: "Scott Nelson",
    email: "scott.nelson@scougalrubber.com",
    phone: "206-686-9190",
  },
  {
    position: [36.778261, -119.4179324],
    name: "California",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [41.6032207, -73.087749],
    name: "Connecticut",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [40.633125, -89.3985283],
    name: "Illinois",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [40.2671941, -86.1349021],
    name: "Indiana",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [41.8780025, -93.097702],
    name: "Iowa",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [45.253783, -69.4454689],
    name: "Maine",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [42.4072107, -71.3824374],
    name: "Massachusetts",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [44.3148443, -85.6023643],
    name: "Michigan",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [46.729553, -94.6858998],
    name: "Minnesota",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [41.4925374, -99.9018131],
    name: "Nebraska",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [38.8026097, -116.419389],
    name: "Nevada",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [43.1938516, -71.5723953],
    name: "New Hampshire",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [47.5514926, -101.0020119],
    name: "North Dakota",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [40.4172871, -82.907123],
    name: "Ohio",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [41.2033216, -77.1945247],
    name: "Pennsylvania",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [41.5800945, -71.4774291],
    name: "Rhode Island",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [43.9695148, -99.9018131],
    name: "South Dakota",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [44.5588028, -72.5778415],
    name: "Vermont",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
  {
    position: [43.7844397, -88.7878678],
    name: "Wisconsin",
    rep: "Victoria Mckay",
    email: "victoria.mckay@scougalrubber.com",
    phone: "775-473-2842",
  },
];

const teamMembers = [
  {
    name: "Rob Anderson",
    position: "President",
    description: `After stints with Boeing and a commercial window manufacturer, Rob came to Scougal in 1992 and has played a role in virtually every facet of the company. He has managed growth in production, operations, and sales. Rob is currently running both the Seattle and Reno operations. His expertise in steel reinforced elastomeric bearings has earned him a noteworthy voice in the bridge bearing community. He has served as a liaison between regulatory and academic entities regarding bearing design and testing standards. Rob has a passion for empowering people to be successful through teamwork and leadership.`,
    image: "/employees/ra.jpg", // Assurez-vous d'avoir ces images dans votre dossier public
  },
  {
    name: "Scott Nelson",
    position: "Vice President Sales & Marketing",
    description: `Scott joined the Sales/Estimating Team in 2006 after graduating from University of Washington with a B.A. in Political Science. He played an instrumental role in moving Scougal Rubber to the new plant in McCarran, NV in 2011, and was responsible for the training and oversight of the estimating team at the new location. Scott was promoted to the position of Sales Manager in 2014, and completed his MBA at University of Nevada in 2016.`,
    image: "/employees/sn.jpg",
  },
  {
    name: "Alfredo Shanklin",
    position: "Plant Manager - Seattle",
    description: `Al has worked at Scougal for over 16 years, starting in Quality Control, but quickly finding his specialty in Production. Each year that Al has been with Scougal, he has been instrumental in keeping the company competitive in the rubber manufacturing world. Outside of work, Al enjoys spending time with his grandchildren, showing them the joys of bird watching. The one thing on his bucket list is to see every species of bird in Washington state.`,
    image: "/employees/as.jpg",
  },
  {
    name: "Ahsan Ativalu",
    position: "Plant Manager - Reno",
    description: `Ahsan started with Scougal Rubber in 1999.  He quickly established himself as a hard worker with a great mind for tackling challenging fabrication issues.  He was promoted to shift supervisor in 2006, and was instrumental in helping to plan and implement the relocation of several critical pieces of equipment to McCarran, NV in 2010 with the opening of the new plant.  During that time Ahsan was promoted to Production Manager, and finally Plant Manager.  He continues to be a vital part of the Scougal Rubber Team.  Ahsan is an avid football fan, and rarely leaves home without wearing the Seahawks emblem.`,
    image: "/employees/aa.jpg",
  },
  {
    name: "Brad Streeter",
    position: "Quality Manager",
    description: `Brad oversees the quality function for the company and brings a wealth of experience and training to the position. He was responsible for implementing formal quality management and continuous improvement programs across the country for over 30 years and is a part the Scougal Rubber success by initiating, developing, and maintaining certifications for AISC at the Nevada site and AS9100 at the Washington site. His love for classic automobiles includes the occasional drive through the desert in his 1968 Pontiac GTO and enjoys the NFL but is a Patriots fan.`,
    image: "/employees/bs.jpg",
  },
];

export default function Experience() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 mt-12">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">Experience</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl">
        This map shows the sales territories covered by our dedicated team across the United States and Canada. Click on a marker to see the details of the sales representative for each region.
      </p>
      <div className="w-full max-w-4xl h-[500px] rounded-lg border-4 border-white shadow-lg mb-12">
        <SalesMap salesTerritories={salesTerritories} />
      </div>
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Meet Our Team</h2>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mb-4 object-cover"/>
            <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
            <p className="text-gray-600 mb-4">{member.title}</p>
            <p className="text-gray-600">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
  