export const setPlayerData = (data: any) => {
  const playerData = JSON.stringify(data);
  sessionStorage.removeItem("player");
  sessionStorage.setItem("player", playerData);
};

export function getPlayerData() {
  const playerData = sessionStorage.getItem("player");
  if (playerData) {
    return JSON.parse(playerData);
  } else {
    return null;
  }
}

export const setPPlayerData = (data: any) => {
  const playerData = JSON.stringify(data);
  sessionStorage.removeItem("p-player");
  sessionStorage.setItem("p-player", playerData);
};

export function getPPlayerData() {
  const playerData = sessionStorage.getItem("p-player");
  if (playerData) {
    return JSON.parse(playerData);
  } else {
    return null;
  }
}

export function generateInvoiceId(cohort: any) {
  const prefix = "INV-";
  const year = new Date().getFullYear();

  return prefix + cohort + "-" + year;
}

export const setInvoiceData = (data: any) => {
  const invoiceData = JSON.stringify(data);
  sessionStorage.removeItem("invoiceData");
  sessionStorage.setItem("invoiceData", invoiceData);
};

export function getInvoiceData() {
  const invoiceData = sessionStorage.getItem("invoiceData");
  if (invoiceData) {
    return JSON.parse(invoiceData);
  } else {
    return null;
  }
}

export const totalCohortChild = (programs: any, id:any) => {
  const programCount = programs
    .filter((program:any) => program.partnerId === id)
    .reduce((count: any, program: any) => {
      const childId = program.childId;
      if (!count.has(childId)) {
        count.set(childId, 1);
      }
      return count;
    }, new Map());

  return programCount.size;
};

export const totalCohortParent = (programs: any, id:any) => {
  const programCount = programs
  .filter((program:any) => program.partnerId === id)
  .reduce((count: any, program: any) => {
    const parentId = program.child.parentId;
    if (!count.has(parentId)) {
      count.set(parentId, 1);
    }
    return count;
  }, new Map());

  return programCount.size;
};

export const calculateDiscountedAmount = (
  debt: any,
  discountPercentage: any
) => {
  const discountAmount = (debt * discountPercentage) / 100;
  return debt - discountAmount;
};

export const useRateCal = (amount: any, rate: any) => {
  return (amount * rate).toFixed(2) | 0;
};

export const useThousand = (amount: any) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
