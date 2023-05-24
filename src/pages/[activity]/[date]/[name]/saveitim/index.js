import Layout from "@/pages/components/LayoutTest";
import { useRouter } from "next/router";
import React from "react";

export default function SaveItim() {
    const router = useRouter();
    const { activity, date, name, nameitim, typeitim, pieceitim } = router.query;

    return(
        <>
            <Layout>

                <div>
                    <h1>Page Save itim</h1>
                    <h2>Activity : {activity}</h2>
                    <h2>Date : {date}</h2>
                    <h2>Name : {name}</h2>
                    <h2>NameItim : {nameitim}</h2>
                    <h2>TypeItim : {typeitim}</h2>
                    <h2>PieceItim : {pieceitim}</h2>
                    <h2>*************************</h2>
                    {/* แสดงข้อมูลหรือโต๊ะอิทิมเพิ่มเติมที่นี่ */}
                </div>

            </Layout>

        </>
    )
}
