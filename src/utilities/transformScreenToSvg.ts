const transformScreenToSvg = (svg: SVGSVGElement, screenPoint: { x: number; y: number }): { x: number; y: number } => {
    const point = svg.createSVGPoint();
    point.x = screenPoint.x;
    point.y = screenPoint.y;
    const { x, y } = point.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x, y };
};

export default transformScreenToSvg;
