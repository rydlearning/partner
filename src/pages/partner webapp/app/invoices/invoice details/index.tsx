import {useEffect, useState} from "react";
import AppLayout from "../../../../../components/layouts/AppLayout";
import {
    calculateDiscountedAmount,
    getInvoiceData,
    getPlayerData, useRateCal, useThousand
} from "../../../../../components/custom-hooks/userInfo";
import PartnerService from "../../../../../services/api/partner.service.ts";
import {toast} from "react-toastify";

const InvoiceDetails = () => {
    // interface TableData {
    //   invoiceId: string;
    //   cohort: string;
    //   all: string;
    //   amount: string;
    //   dueDate: string;
    //   issuedDate: string;
    // }

    const partner = getPlayerData()
    const discount = partner.discount
    const partnerServices = new PartnerService()

    const [invoiceData, setInvoiceData] = useState<any>([]);
    const [isStripeReady, setIsStripeReady] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [url, setUrl] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => { // Make getInvoiceData async
            const data = await getInvoiceData();
            setInvoiceData(data);
        };
        fetchData(); // Call the function inside useEffect
    }, []);


    const invoiceDetails: { key: string; value: any; }[] = [
        {
            key: "Invoice Number",
            value: invoiceData?.invoiceId || "N/A",
        },
        {
            key: "Date Issued",
            value: invoiceData?.issuedDate || "N/A",
        },
        {
            key: "Cohort",
            value: invoiceData?.cohort || "N/A",
        },
        {
            key: "No. of Students",
            value: invoiceData?.all || "N/A",
        },
        {
            key: "Amount Due",
            value: partner?.rate?.currencyCode + useThousand(useRateCal(calculateDiscountedAmount(invoiceData?.amount, discount), partner?.rate?.rate)) || "N/A",
        },
        {
            key: "Due Date",
            value: invoiceData?.dueDate || "N/A",
        },
        {
            key: "Status",
            value: "Not Paid",
        },
    ];

    //request stripe payment
    const requestStrip = async () => {
        //check if cohort id is set
        if(invoiceData.cohortId) {
            setIsLoading(true)
            const finalAmount = useRateCal(calculateDiscountedAmount(invoiceData?.amount, discount), partner?.rate?.rate)
            const data = await partnerServices.createPartnerInvoice({
                currency: partner.rate.currencyCode,
                amount: finalAmount * 100,
                metadata: {isPartner: true, partner_id: partner.id, cohortId: invoiceData.cohortId}
            })
            //view response
            if (data.status && data?.data.url) {
                setIsStripeReady(true)
                setUrl(data.data)
            }
        }else {
            toast.info("Unable to process invoice at the moment, kindly reach out to admin")
        }
    }

    const goToPayment=()=>{
        window.open(url?.url, "_blank")
    }
    return (
        <AppLayout>
            <section className="w-[70%]">
                <div className="flex items-center space-x-2 mt-10">

                </div>

                <div className="bg-white rounded-lg px-6 py-8">
                    <h2>INVOICE DETAILS</h2>
                    <div className="w-full bg-[#DADCE0] h-[1px] mt-4"></div>
                    <div className="grid grid-cols-4 gap-6 mt-5">
                        {invoiceData ?
                            <>
                                {invoiceDetails.map((d, i) => {
                                    return (
                                        <div key={i}>
                                            <p className="font-semibold">{d.key}</p>
                                            <p className="text-[#5E5E5E]">{d.value}</p>
                                        </div>
                                    );
                                })}
                                {isStripeReady ? <>
                                        <button onClick={event => {
                                            event.preventDefault()
                                            goToPayment()
                                        }} style={{
                                            color: 'white',
                                            backgroundColor: '#6e1162'
                                        }}>Make Payment Now</button>
                                    </> :
                                    <button disabled={isLoading} onClick={event => {
                                        event.preventDefault()
                                        requestStrip()
                                    }} style={{
                                        color: 'red',
                                        backgroundColor: '#e7e7e7'
                                    }}>{isLoading ? "Processing..." : "Process Payment"}</button>}
                            </> : <>Loading....</>}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};


export default InvoiceDetails;
