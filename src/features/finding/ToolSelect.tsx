import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTool, toolChanged } from "./findingSlice";
import { Col, Row } from "antd";
import styled from "styled-components";
import { toolsInfo } from "../../common/consts";

const ToolButton = styled.button`
    background-color: transparent;
    border: none;
    width: 25%;
    cursor: pointer;
    opacity: ${props => props.disabled ? 1 : 0.5};

    :hover {
        opacity: 1;
    }
`

const ToolImage = styled.img`
    width: 100%;
    height: auto;
`

const ToolSelect = () => {
    const dispatch = useAppDispatch();
    const selectedTool = useAppSelector(selectTool);

    const buttons = toolsInfo.map(toolInfo => {
        return <ToolButton key={toolInfo.id} onClick={() => dispatch(toolChanged(toolInfo.tool))} disabled={toolInfo.tool === selectedTool}>
            <ToolImage src={toolInfo.img} />
        </ToolButton>
    });

    return <Row align="middle">
        <Col span={9}>
            <p>Инструменты</p>
        </Col>
        <Col span={15}>
            {buttons}
        </Col>
    </Row>
}

export default ToolSelect;