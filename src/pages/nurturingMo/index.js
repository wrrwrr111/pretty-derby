import dynamic from "next/dynamic";

const DynamicNurturingMo = dynamic(() => import("../../components/nurturing/NurturingMo"), {
  ssr: false,
});

const Index = () => {
  return <DynamicNurturingMo />;
};

export default Index;
