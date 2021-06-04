// import React, { useState } from 'react';
// import { Tab } from '@material-ui/core';
//
// import { makeStyles } from '@material-ui/core/styles';
// import CardFormContext from '../../context/context';
// import CardFormTabs from './CardFormTabs';
//
// //
// // - ContextProvider
// // - Tabs
// // - Input
// // - Panel
//
// const useStyles = makeStyles(() => ({
//   tab: {
//     fontSize: 'var(--font-size-small)',
//     minWidth: 'auto',
//     margin: '0 5px',
//   },
// }));
//
// interface CardFormProps<T extends CardDataType, K> {
//   label: CardLabels;
//   tabLabels: K[];
//   cardType?: CardType;
//   editing?: boolean;
//   cardData: T | T[];
//   cardFormData: T;
//   dispatchFormAction: () => any;
// }
//
// const CardFormBody = <T extends CardDataType, K extends TabLabel>({
//   tabLabels,
//   cardData,
// }: CardFormProps<T, K>) => {
//   const classes = useStyles();
//
//   const [placeholder, setPlaceholder] = useState(tabLabels[0]);
//
//   return (
//     <>
//       <CardFormTabs>
//         {tabLabels.map((tabLabel) => (
//           <Tab
//             label={tabLabel}
//             classes={{ root: classes.tab }}
//             key={tabLabel}
//             onClick={() => handlePlaceholder(tabLabel)}
//           />
//         ))}
//       </CardFormTabs>
//     </>
//   );
// };
//
// export default CardFormBody;
