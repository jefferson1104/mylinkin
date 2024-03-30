/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, ReactNode, useEffect, useReducer } from 'react';

// INTERFACES
import { ILink, ISimpleLinkMetric } from '../interfaces/link';

// LINKS PROVIDER UTILS
interface ILinksState {
    registeredLinks: ILink[];
    metrics: ISimpleLinkMetric[];
    isLoadingLinks: boolean;
    isLoadingMetrics: boolean;
    errorLinksMetrics: boolean;
};

interface ILinksContext extends ILinksState {};

interface ILinksProviderProps {
    children: ReactNode;
};

type TLinksAction =
  | { type: 'SET_LINKS'; payload: ILink[] }
  | { type: 'SET_METRICS'; payload: ISimpleLinkMetric[] }
  | { type: 'LOADING_LINKS'; payload: boolean }
  | { type: 'LOADING_METRICS'; payload: boolean }
  | { type: 'SET_ERROR'; payload: boolean };

const initialState = {
    registeredLinks: [],
    metrics: [],
    isLoadingLinks: true,
    isLoadingMetrics: true,
    errorLinksMetrics: false,
};

const linksReducer = (state: ILinksState, action: TLinksAction): ILinksState => {
    switch (action.type) {
        case 'SET_LINKS':
            return { ...state, registeredLinks: action.payload, isLoadingLinks: false };
        case 'SET_METRICS':
            return { ...state, metrics: action.payload, isLoadingMetrics: false };
        case 'LOADING_LINKS':
            return { ...state, isLoadingLinks: true };
        case 'LOADING_METRICS':
            return { ...state, isLoadingMetrics: true };
        case 'SET_ERROR':
            return { ...state, errorLinksMetrics: true };
        default:
            return state;
    }
};

// LINKS CONTEXT
const LinksContext = createContext<ILinksContext>({} as ILinksContext);

// LINKS PROVIDER
export const LinksProvider = ({ children }: ILinksProviderProps) => {
    /* States */
    const [state, dispatch] = useReducer(linksReducer, initialState);
    const { registeredLinks, metrics, isLoadingLinks, isLoadingMetrics, errorLinksMetrics } = state;

    /* Vars */
    const apiBaseUrl = process.env.NEXT_PUBLIC_API;

    /* Handlers */
    const fetchData = async () => {
        try {
            const linksPromise = fetch(`${apiBaseUrl}/api/links`).then(res => res.json());
            const metricsPromise = fetch(`${apiBaseUrl}/api/metrics`).then(res => res.json());

            dispatch({ type: 'LOADING_LINKS', payload: true });
            dispatch({ type: 'LOADING_METRICS', payload: true });

            const [links, metrics] = await Promise.all([linksPromise, metricsPromise]);

            dispatch({ type: 'SET_LINKS', payload: links });
            dispatch({ type: 'SET_METRICS', payload: metrics });
        } catch (error) {
            console.log('fetchData() error: ', error);
            dispatch({type: 'SET_ERROR', payload: true });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <LinksContext.Provider value={{ registeredLinks, metrics, isLoadingLinks, isLoadingMetrics, errorLinksMetrics }}>
            {children}
        </LinksContext.Provider>
    );
};

export const useLinks = () => {
    const context = useContext(LinksContext);
    return context;
};
