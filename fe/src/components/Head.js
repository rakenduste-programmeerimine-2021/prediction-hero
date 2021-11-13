import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Typography } from 'antd';

const { Paragraph } = Typography;

function Head() {

    return (
        <div style={Styles.navbar}>
            <div>Prediction Hero</div>
        </div>
    )
}
const Styles = {
    navbar: {
        backgroundColor: "navy",
        height: 50,
        color: "white"
    }
}

export default Head;
