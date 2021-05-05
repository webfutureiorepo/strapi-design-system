/* eslint-disable react/display-name */
import * as React from 'react';
import { render } from '@testing-library/react';
import { Pagination } from '../Pagination';
import { PreviousLink, NextLink, PageLink, Dots } from '../components';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('@strapi/icons', () => ({
  BackFilter: () => <span>BackFilter</span>,
  NextFilter: () => <span>NextFilter</span>,
}));

describe('Pagination', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Pagination activePage={1} pageCount={4}>
          <PreviousLink href="/1">Go to previous page</PreviousLink>
          <PageLink number={1} href="/1">
            Page 1
          </PageLink>
          <PageLink number={2} href="/2">
            Page 2
          </PageLink>
          <PageLink number={3} href="/3">
            Page 3
          </PageLink>
          <Dots>There are pages in between</Dots>
          <PageLink number={4} href="/4">
            Page 4
          </PageLink>
          <NextLink href="/3">Go to next page</NextLink>
        </Pagination>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c1 > * + * {
        margin-left: 4px;
      }

      .c4 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      .c8 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c11 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c9 {
        line-height: revert;
      }

      .c2 {
        padding: 12px;
        border-radius: 4px;
        -webkit-text-decoration: none;
        text-decoration: none;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }

      .c5 {
        padding: 12px;
        border-radius: 4px;
        box-shadow: 0px 1px 4px rgba(26,26,67,0.1);
        -webkit-text-decoration: none;
        text-decoration: none;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }

      .c6 {
        color: #271fe0;
        background: #ffffff;
      }

      .c6:focus-visible {
        box-shadow: 0px 0px 6px #7b79ff;
      }

      .c6:focus .c7,
      .c6:hover .c7 {
        font-weight: bold;
      }

      .c10 {
        color: #32324d;
      }

      .c10:focus-visible {
        box-shadow: 0px 0px 6px #7b79ff;
      }

      .c10:focus .c7,
      .c10:hover .c7 {
        font-weight: bold;
      }

      .c3 {
        font-size: 0.7rem;
        pointer-events: none;
      }

      .c3 svg path {
        fill: #c0c0cf;
      }

      .c3:focus svg path,
      .c3:hover svg path {
        fill: #c0c0cf;
      }

      .c13 {
        font-size: 0.7rem;
      }

      .c13 svg path {
        fill: #8e8ea9;
      }

      .c13:focus svg path,
      .c13:hover svg path {
        fill: #4a4a6a;
      }

      .c12 {
        color: #32324d;
      }

      <nav
        aria-label="pagination"
        class=""
      >
        <ul
          class="c0 c1"
        >
          <li>
            <a
              aria-disabled="true"
              class="c2 c3"
              href="#"
              tabindex="-1"
            >
              <div
                class="c4"
              >
                Go to previous page
              </div>
              <span>
                BackFilter
              </span>
            </a>
          </li>
          <li>
            <a
              aria-current="true"
              class="c5 c6"
              href="/1"
            >
              <div
                class="c4"
              >
                Page 1
              </div>
              <p
                aria-hidden="true"
                class="c7 c8 c9"
              >
                1
              </p>
            </a>
          </li>
          <li>
            <a
              aria-current="false"
              class="c2 c10"
              href="/2"
            >
              <div
                class="c4"
              >
                Page 2
              </div>
              <p
                aria-hidden="true"
                class="c7 c11 c9"
              >
                2
              </p>
            </a>
          </li>
          <li>
            <a
              aria-current="false"
              class="c2 c10"
              href="/3"
            >
              <div
                class="c4"
              >
                Page 3
              </div>
              <p
                aria-hidden="true"
                class="c7 c11 c9"
              >
                3
              </p>
            </a>
          </li>
          <li>
            <div
              class="c2 c12"
            >
              <div
                class="c4"
              >
                There are pages in between
              </div>
              <p
                aria-hidden="true"
                class="c7 c11 c9"
              >
                …
              </p>
            </div>
          </li>
          <li>
            <a
              aria-current="false"
              class="c2 c10"
              href="/4"
            >
              <div
                class="c4"
              >
                Page 4
              </div>
              <p
                aria-hidden="true"
                class="c7 c11 c9"
              >
                4
              </p>
            </a>
          </li>
          <li>
            <a
              aria-disabled="false"
              class="c2 c13"
              href="/3"
            >
              <div
                class="c4"
              >
                Go to next page
              </div>
              <span>
                NextFilter
              </span>
            </a>
          </li>
        </ul>
      </nav>
    `);
  });

  it('snapshots the component with the last item disabled', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Pagination activePage={4} pageCount={4}>
          <PreviousLink href="/1">Go to previous page</PreviousLink>
          <PageLink number={1} href="/1">
            Page 1
          </PageLink>
          <PageLink number={2} href="/2">
            Page 2
          </PageLink>
          <PageLink number={3} href="/3">
            Page 3
          </PageLink>
          <Dots>There are pages in between</Dots>
          <PageLink number={4} href="/4">
            Page 4
          </PageLink>
          <NextLink href="/3">Go to next page</NextLink>
        </Pagination>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c1 > * + * {
        margin-left: 4px;
      }

      .c4 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      .c7 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c12 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c8 {
        line-height: revert;
      }

      .c2 {
        padding: 12px;
        border-radius: 4px;
        -webkit-text-decoration: none;
        text-decoration: none;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }

      .c10 {
        padding: 12px;
        border-radius: 4px;
        box-shadow: 0px 1px 4px rgba(26,26,67,0.1);
        -webkit-text-decoration: none;
        text-decoration: none;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }

      .c5 {
        color: #32324d;
      }

      .c5:focus-visible {
        box-shadow: 0px 0px 6px #7b79ff;
      }

      .c5:focus .c6,
      .c5:hover .c6 {
        font-weight: bold;
      }

      .c11 {
        color: #271fe0;
        background: #ffffff;
      }

      .c11:focus-visible {
        box-shadow: 0px 0px 6px #7b79ff;
      }

      .c11:focus .c6,
      .c11:hover .c6 {
        font-weight: bold;
      }

      .c3 {
        font-size: 0.7rem;
      }

      .c3 svg path {
        fill: #8e8ea9;
      }

      .c3:focus svg path,
      .c3:hover svg path {
        fill: #4a4a6a;
      }

      .c13 {
        font-size: 0.7rem;
        pointer-events: none;
      }

      .c13 svg path {
        fill: #c0c0cf;
      }

      .c13:focus svg path,
      .c13:hover svg path {
        fill: #c0c0cf;
      }

      .c9 {
        color: #32324d;
      }

      <nav
        aria-label="pagination"
        class=""
      >
        <ul
          class="c0 c1"
        >
          <li>
            <a
              aria-disabled="false"
              class="c2 c3"
              href="/1"
            >
              <div
                class="c4"
              >
                Go to previous page
              </div>
              <span>
                BackFilter
              </span>
            </a>
          </li>
          <li>
            <a
              aria-current="false"
              class="c2 c5"
              href="/1"
            >
              <div
                class="c4"
              >
                Page 1
              </div>
              <p
                aria-hidden="true"
                class="c6 c7 c8"
              >
                1
              </p>
            </a>
          </li>
          <li>
            <a
              aria-current="false"
              class="c2 c5"
              href="/2"
            >
              <div
                class="c4"
              >
                Page 2
              </div>
              <p
                aria-hidden="true"
                class="c6 c7 c8"
              >
                2
              </p>
            </a>
          </li>
          <li>
            <a
              aria-current="false"
              class="c2 c5"
              href="/3"
            >
              <div
                class="c4"
              >
                Page 3
              </div>
              <p
                aria-hidden="true"
                class="c6 c7 c8"
              >
                3
              </p>
            </a>
          </li>
          <li>
            <div
              class="c2 c9"
            >
              <div
                class="c4"
              >
                There are pages in between
              </div>
              <p
                aria-hidden="true"
                class="c6 c7 c8"
              >
                …
              </p>
            </div>
          </li>
          <li>
            <a
              aria-current="true"
              class="c10 c11"
              href="/4"
            >
              <div
                class="c4"
              >
                Page 4
              </div>
              <p
                aria-hidden="true"
                class="c6 c12 c8"
              >
                4
              </p>
            </a>
          </li>
          <li>
            <a
              aria-disabled="true"
              class="c2 c13"
              href="#"
              tabindex="-1"
            >
              <div
                class="c4"
              >
                Go to next page
              </div>
              <span>
                NextFilter
              </span>
            </a>
          </li>
        </ul>
      </nav>
    `);
  });
});
