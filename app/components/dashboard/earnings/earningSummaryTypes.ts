import { Component } from "react";

/* Available for Withdrawl Card */

type WithdrawalHeaderType = {
  amount: string;
};

type WithdrawalContentType = {
  description: string;
};

type WithdrawalFooterType = {
  css: string;
  text: string;
};

// Might be used in the future
// if we decide to handle the API call at the page level
type WithdrawalCardProps = {
  title: string;
  description: string;
  amount: string;
};

/*** Lifetime Earnings Card ***/

type LifetimeEarningsHeaderType = {
  amount: string;
};
type LifetimeEarningsContentType = {
  description: string;
};

/*** Pending Payout Card ***/

type PendingPayoutHeaderType = {
  amount: string;
};
type PendingPayoutContentType = {
  description: string;
};

export type {
  WithdrawalHeaderType,
  WithdrawalContentType,
  WithdrawalFooterType,
  WithdrawalCardProps,
  LifetimeEarningsHeaderType,
  LifetimeEarningsContentType,
  PendingPayoutHeaderType,
  PendingPayoutContentType,
};
