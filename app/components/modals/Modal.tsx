"use client";
import { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center items-center bg-neutral-800/70 z-50 fixed inset-0 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* CONTENT */}
          <div
            className={`translate duration-300 h-full 
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-1" : "opacity-0"}
           `}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoMdClose />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      disabled={disabled}
                    />
                  )}

                  <Button
                    label={actionLabel}
                    onClick={handleSubmit}
                    disabled={disabled}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

// # Set the API endpoint URLs
// $loginUrl = "https://dealer.parts-unlimited.com/api/login"
// $priceFileUrl = "https://dealer.parts-unlimited.com/api/quotes/pricefile"

// # Define your credentials
// $credentials = @{
//     dealerCode = "Mor118"
//     username   = "jmorris"
//     password   = "morriscycle"
// }

// # Create the JSON string for the credentials
// $jsonCredentials = @"
// {
//     "dealerCode": "$($credentials.dealerCode)",
//     "username": "$($credentials.username)",
//     "password": "$($credentials.password)"
// }
// "@

// # Log: Printing a message for the login process
// Write-Host "Logging in..."

// # Make the login request using Invoke-RestMethod
// $loginResponse = Invoke-RestMethod -Uri $loginUrl -Method Put -ContentType "application/json" -Body $jsonCredentials -SessionVariable session

// # Log: Printing a message for successful login
// Write-Host "Login successful."

// # Log: Saving the cookies to a file
// Write-Host "Saving cookies to 'cookies.txt'..."

// # Save the cookies to a file (cookies.txt)
// $session.Cookies.GetCookies($loginUrl) | Select-Object -ExpandProperty Value | Out-File -FilePath "cookies.txt"

// # Log: Printing a message for Price File retrieval
// Write-Host "Retrieving Price File..."

// # Define the request body for retrieving the Price File
// $priceFileRequest = @{
//     dealerCodes      = @("Mor118") # Your dealer code
//     headersPrepended = $true
// }

// # Create the JSON string for the Price File request
// $jsonPriceFileRequest = @"
// {
//     "dealerCodes": ["$($priceFileRequest.dealerCodes[0])"],
//     "headersPrepended": $($priceFileRequest.headersPrepended)
// }
// "@

// # ... (previous code) ...

// # Log: Printing a message for Price File request
// Write-Host "Price File request sent..."

// # Make the request to retrieve the Price File using cookies
// try {
//     $priceFileResponse = Invoke-RestMethod -Uri $priceFileUrl -Method Post -ContentType "application/json" -Body $jsonPriceFileRequest -Headers @{ "Cookie" = $session.Cookies.GetCookies($priceFileUrl) }

//     # Log: Printing the response from Price File request
//     Write-Host "Response from Price File request:"
//     Write-Host $priceFileResponse

//     if ($priceFileResponse) {
//         # Save the response as "pricefile.zip"
//         [System.IO.File]::WriteAllBytes("pricefile.zip", $priceFileResponse)

//         # Log: Printing a message for successful Price File retrieval
//         Write-Host "Price File retrieved and saved as 'pricefile.zip'."
//     } else {
//         # Log: Printing a message for empty response
//         Write-Host "Error: Empty response received."
//     }
// }
// catch {
//     # Log: Printing an error message for request failure
//     Write-Host "Error occurred during request: $_"
// }
