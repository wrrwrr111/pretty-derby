import dynamic from "next/dynamic";

const DynamicNurturing = dynamic(() => import("../../components/nurturing/Nurturing"), {
  ssr: false,
});

const Index = () => {
  return <DynamicNurturing />;
};

export default Index;
