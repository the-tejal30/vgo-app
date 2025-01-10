import { useState } from "react";
import { useResizeDetector } from 'react-resize-detector';
import useRedux from "../../hooks/useRedux";
import useRouter from "../../hooks/useRouter";
import { setDeviceStatus } from "../../redux/app/reducer";
import { notEqual, length, isEqual } from "../../utils/javascript";
import { sidebarMenus } from "../sidebar.description";

const appLayout = () => {
    const { navigate, location } = useRouter();
    const { dispatch, selector } = useRedux();
    const isDesktop = selector(state => state.app.isDesktop);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const activeItem1 = location.pathname;
    const defaultOpenKeys = [`/${activeItem1.split('/')?.[1]}`];

    const onResize = width => {
        if (!width) return;
        const isGreaterWidth = width > 991;
        notEqual(isGreaterWidth, isDesktop) &&
            dispatch(setDeviceStatus(isGreaterWidth));
        return isGreaterWidth && toggleMenu && setToggleMenu(false);
    };
    const { ref } = useResizeDetector({
        onResize,
    });

    const removeAddFromLastPath = () => {
        let url = ''
        const pathSegments = activeItem1.split('/')
        const lastSegmentIndex = length(pathSegments) - 1
        if (
            lastSegmentIndex >= 0 &&
            isEqual(pathSegments[lastSegmentIndex], 'add')
        ) {
            pathSegments.pop()
            url = pathSegments.join('/')
        } else {
            url = activeItem1
        }
        return url.toString()
    }

    const handleMenu = e => {
        navigate(e?.key);
        !isDesktop && toggleMenu && setToggleMenu(false);
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }    

    return {
        ref,
        isDesktop,
        collapsed,
        toggleCollapsed,
        activeItem: removeAddFromLastPath(),
        defaultOpenKeys,
        toggleMenu,
        setToggleMenu,
        handleMenu,
        items: sidebarMenus,
    };
};
export default appLayout;
