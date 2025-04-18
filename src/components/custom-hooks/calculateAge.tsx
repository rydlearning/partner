

export default function calculateAge( birthDate: Date | string | number){
    const today: any = new Date();
    const birthDateObj: any = new Date(birthDate);
    const diff = today - birthDateObj;
    const ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    
    return ageInYears;
  };