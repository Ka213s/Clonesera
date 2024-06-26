import React from 'react';
import { Button, Typography, Row, Col, Card } from 'antd';

const { Title, Text } = Typography;

const BecomeInstructor = () => {
  return (
    <div className="bg-gray-100 p-5">
      {/* Header Section */}
      <div className="bg-cover bg-center text-white text-center py-20" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}>
        <Title level={1} className="text-white">Become an Instructor</Title>
        <Text className="text-lg">Instructors are the key to spreading Mental Health First Aid across the country. Instructors are individuals certified to teach the course in their communities and beyond.</Text>
        <br />
        <Button type="primary" size="large" className="mt-5 bg-[#9997F5] hover:bg-[#8886E5]">Apply for Instructor Training</Button>
      </div>

      {/* Reasons to Become an Instructor Section */}
      <div className="py-20 text-center">
        <Title level={2}>4 Reasons to Become a Mental Health First Aid Instructor</Title>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-lg">
            <div className="text-4xl">🌐</div>
            <Title level={4}>Connect</Title>
            <Text>Bring your community together</Text>
          </Card>
          <Card className="shadow-lg">
            <div className="text-4xl">🎤</div>
            <Title level={4}>Advocate</Title>
            <Text>Reduce negative attitudes about mental illnesses</Text>
          </Card>
          <Card className="shadow-lg">
            <div className="text-4xl">📚</div>
            <Title level={4}>Educate</Title>
            <Text>Build mental health literacy</Text>
          </Card>
          <Card className="shadow-lg">
            <div className="text-4xl">🙌</div>
            <Title level={4}>Lead</Title>
            <Text>Show others how they can help</Text>
          </Card>
        </div>
      </div>

      {/* What Do Instructors Do Section */}
      <div className="bg-cover bg-center text-white text-center py-20" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}>
        <Title level={2} className="text-white">What Do Instructors Do?</Title>
        <Text className="text-lg">Instructors are on the frontlines of the program and train people in their communities in Mental Health First Aid. Certified Adult and Youth Instructors are required to teach the course at least three times per year. Instructors also create, market and coordinate their classes while supporting their learners along the way. Instructors teach from a national curriculum, tailor discussions to their participants and compile a list of local resources for help.</Text>
        <br />
        <a href="/learn-more" className="text-white underline">Learn more about the role of an Instructor.</a>
      </div>

      {/* How to Become Certified and Maintaining Certification Section */}
      <div className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="How to Become Certified as an Adult or Youth Instructor" className="shadow-lg">
            <Text>Applicants to an Adult or Youth MHFA Instructor training course must first be certified as a First Aider in that curriculum. Instructor certification results from a 3-day training that presents the Mental Health First Aid course and provides in-depth instruction on facilitating the curriculum. The training includes self-paced pre-work, a written exam and a presentation that evaluates each candidate’s ability to present the Mental Health First Aid course to a variety of audiences. Become certified to teach the Adult or Youth curriculum, or both.</Text>
          </Card>
          <Card title="Maintaining Certification" className="shadow-lg">
            <Text>Once certified, Instructors must teach the course at least three times per year to maintain their certification. Dual certified Instructors must teach a minimum of three courses per year with at least one course from each curriculum (Adult and Youth) annually to maintain certification. Mental Health First Aid USA will provide ongoing technical assistance and marketing support to certified Instructors to help them disseminate the course in their communities.</Text>
            <br />
            <Text>Questions about maintaining Instructor certification? Contact us via the Request Assistance form. Go to the Resources page on MHFA Connect, and select Request Forms from the category filter dropdown.</Text>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BecomeInstructor;
