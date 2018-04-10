import React from 'react';
import {grey} from "material-ui/colors";

import * as BlockTypes from "../../types/blockTypes";

const SHAPE_START = 'shape_start';
const SHAPE_QUESTION = 'shape_question';
const SHAPE_VARIANT = 'shape_variant';
const SHAPE_ANSWER = 'shape_answer';

const shapeProps = {
    cx: 10,
    cy: 10,
    r: 9
};

const iconProps = {
    x: 7.5,
    y: 10,
    strokeWidth: 0,
    fontFamily :"Material Icons",
    fontSize: 5,
    fill: grey[900]
};

const StartShape = (
    <symbol id={SHAPE_START} viewBox="0 0 20 20">
        <circle {...shapeProps} />
        <text {...iconProps}>play_for_work</text>
    </symbol>
);

const QuestionShape = (
    <symbol id={SHAPE_QUESTION} viewBox="0 0 20 20">
        <circle {...shapeProps} />
        <text {...iconProps}>help_outline</text>
    </symbol>
);

const VariantShape = (
    <symbol id={SHAPE_VARIANT} viewBox="0 0 20 20">
        <circle {...shapeProps} />
        <text {...iconProps}>call_split</text>
    </symbol>
);

const AnswerShape = (
    <symbol id={SHAPE_ANSWER} viewBox="0 0 20 20">
        <circle {...shapeProps} />
        <text {...iconProps}>priority_high</text>
    </symbol>
);

const EmptyEdgeShape = (
    <symbol viewBox="0 0 0 0" id="emptyEdge" />
);

export default {
    NodeTypes: {
        [BlockTypes.BLOCK_TYPE_START]: {
            typeText: "_",
            shapeId: `#${SHAPE_START}`,
            shape: StartShape
        },
        [BlockTypes.BLOCK_TYPE_QUESTION]: {
            typeText: "_",
            shapeId: `#${SHAPE_QUESTION}`,
            shape: QuestionShape
        },
        [BlockTypes.BLOCK_TYPE_VARIANT]: {
            typeText: "_",
            shapeId: `#${SHAPE_VARIANT}`,
            shape: VariantShape
        },
        [BlockTypes.BLOCK_TYPE_ANSWER]: {
            typeText: "_",
            shapeId: `#${SHAPE_ANSWER}`,
            shape: AnswerShape
        }
    },
    EdgeTypes: {
        emptyEdge: {
            shapeId: "#emptyEdge",
            shape: EmptyEdgeShape
        }
    },
    NodeSubtypes: {},
}